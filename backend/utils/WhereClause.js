class WhereClause
{
    constructor(base,bigQ){

        this.base=base;
        this.bigQ=bigQ;

    }

    search(){
        const searchWord=this.bigQ.keyword || this.bigQ.category?{
          title:{
            $regex:this.bigQ.keyword,
            $options:'i'
          },  
          category: {
                 $regex: this.bigQ.category,
                 $options: "i",
               },

        }:{}



        this.base=this.base.find({...searchWord})
        return this;
    }

    filter(){
        let copyQ=this.bigQ

        delete["keyword"]
        delete["page"]
        delete["limit"]

        let stringOfCopyQ=JSON.stringify(copyQ)

        stringOfCopyQ=stringOfCopyQ.replace(/\b(gte || lte || gt || lt )\b/g,m=>`$${m}`)

        let jsonCopyQ=JSON.parse(stringOfCopyQ)

        this.base=this.base.find(jsonCopyQ)
        return this;
    }

    pager(resultperPage){
     
        let currPage=1

        if(this.bigQ.page){
            currPage=Number(this.bigQ.page)
        }

        let skipValue=resultperPage * (currPage-1)

        this.base=this.base.limit(resultperPage).skip(skipValue)

        return this;

    }
}

module.exports=WhereClause