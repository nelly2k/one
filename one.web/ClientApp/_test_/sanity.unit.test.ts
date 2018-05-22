import { NotFoundError } from "../http/errors";

describe("sanity test", ()=>{
    it("builds", ()=>{
        expect(true).toBe(true);
    })

    it("catching errors",()=>{
        let error = null;
        try{
            throw new NotFoundError("story");

        }catch(e){
            error=e;
        }

        expect(error).toBeInstanceOf(NotFoundError);
        expect(error instanceof NotFoundError).toBe(true);
    })
})