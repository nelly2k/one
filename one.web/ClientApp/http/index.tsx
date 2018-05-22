import { fetch, addTask } from 'domain-task';
import { NotFoundError, BadRequestError } from "./errors";

class HttpClient {
    public static BuildUrl(entity: string, routeParams?: (string | number)[]): string {
        var url = `/api/${entity}`;
        if (routeParams && routeParams.length > 0) {
            const params = routeParams.join("/");
            url = `${url}/${params}`
        }

        return url;
    }

    public static BuildQueryFromObject<T>(obj:T){
        let strs = new Array<string>();
        
        for (let key in obj) {
            strs.push(`${key}=${obj[key]}`)
        }
        return strs.join("&");
    }

    public static async get<T>(entity: string,...routeParams: (string|number)[]): Promise<T> {
        const task = fetch(this.BuildUrl(entity, routeParams));
        addTask(task);

        var response = await task;
        await this.ValidateResponse(response, entity);
        return response.json() as Promise<T>;
    }

    public static async post<TData, TId>(entity: string, data: TData, ...routeParams: (string|number)[]): Promise<TId> {
        const url = this.BuildUrl(entity, routeParams);
        const task = fetch(url, {
            body: JSON.stringify(data),
            cache: "no-cache",
            headers: {
                "content-type": "application/json"
            },
            method: "POST"
        });

        addTask(task);
        var response = await task;
        await this.ValidateResponse(response, entity);
        return response.json() as Promise<TId>;
    }

    static async put(entity: string, ...routeParams: (string|number)[]): Promise<void> {
        const url = this.BuildUrl(entity, routeParams);
        const task = fetch(url, { method: "put" });
        addTask(task);
        var response = await task;
        await this.ValidateResponse(response, entity);
    }

    public static async delete(entity: string, ...routeParams: (string|number)[]): Promise<void> {
        const url = this.BuildUrl(entity, routeParams);
        const task = fetch(url, { method: "delete" });
        addTask(task);
        var response = await task;
        await this.ValidateResponse(response, entity);
    }

    static async ValidateResponse(response: any, entity: string): Promise<void> {
        if (response.ok) {
            return;
        } else if (response.status == 404) {
            throw new NotFoundError(entity);
        } else if (response.status == 400) {
            throw new BadRequestError(await response.clone().json() as Promise<any>);
        }
        else {
            throw new Error(response.status);
        }
    }
}

export default HttpClient