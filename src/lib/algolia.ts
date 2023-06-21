import algoliasearch from "algoliasearch"

const appId:string = process.env.ALGOLIA_APP_ID ?? ""
const appKey:string = process.env.ALGOLIA_WRITE_KEY ?? ""

const client = algoliasearch(appId, appKey)

try {
    const index = client.initIndex("test_index")
    console.log(`Algolia App #${index.appId} connected`)
} catch (e) {
    console.error(e)
}

export default client