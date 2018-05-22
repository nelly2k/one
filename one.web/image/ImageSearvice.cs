using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace one.web.image
{   
    public interface IImageService{
        Task<ImageSearchResult> Search(string term, int page = 1);
    }

    //https://unsplash.com/documentation#search-photos
    public class ImageService:IImageService{

        public async  Task<ImageSearchResult> Search(string term, int page = 1){
            var clientId = "7eb7fb541fd4f40d6e5a4b2353d2d8f6725b1620b815f94caffda56bf8db3f3f";

            var client = new HttpClient();
            var uri = new System.Uri( $"https://api.unsplash.com/search/photos/?client_id={clientId}&query={term}&page={page}");

            var response = await client.GetAsync(uri);
            var serverResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<UnsplashSearchResponse>(serverResponse);

            return new ImageSearchResult{
                TotalPages = result.total_pages,
                ImageInfos = result.results.Select(x=>new ImageInfo{Id = x.id, Href = x.urls.small}).ToList()
            };
        }
    }

    public class UnsplashSearchResponse{
        public int total { get; set; }
        public int total_pages { get; set; }

        public ICollection<UnsplashPhotoId> results {get;set;}
    }

    public class UnsplashPhotoId{
        public string id { get; set; }
        public string created_at { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public string color { get; set; }
        public int likes { get; set; }
        public bool liked_by_user { get; set; }
        public string description { get; set; }
        public UnsplashUser user { get; set; }

        public UnslpashUrls urls {get;set;}
    }

    public class UnsplashUser{
        public string id { get; set; }
        public string username { get; set; }
        public string name { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string twitter_username { get; set; }
        public string portfolio_url { get; set; }

    }

    public class UnslpashUrls{
        public string raw { get; set; }
        public string full { get; set; }
        public string regular { get; set; }
        public string small { get; set; }
        public string thumb { get; set; }
    }

    public class ImageSearchResult{

        public int  TotalPages {get;set;}
        public IEnumerable<ImageInfo> ImageInfos { get; set; }
    }

    public class ImageInfo{
        public string Href { get; set; }
        public string Id {get;set;}
    }
}