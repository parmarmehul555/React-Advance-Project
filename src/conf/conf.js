const conf = {
    appWrieURL : String(import.meta.env.VITE_APPWRITE_URL),
    appWrieProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWrieDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWrieCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWrieBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf