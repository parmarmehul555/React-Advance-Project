import conf from '../conf.js'
import {Client,Account,ID,Databases,Storage,Query} from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appWrieURL).setProject(conf.appWrieProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(conf.appWrieDatabaseId,conf.appWrieCollectionId,ID.unique(),{
                title,content,featuredImage,status,userId
            })
        } catch (error) {
            return error;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(conf.appWrieDatabaseId,conf.appWrieCollectionId,slug,{
                title,content,featuredImage,status
            })
        } catch (error) {
            return error;
        }
    }

    async deletePost({slug}){
        try {
            await this.databases.deleteDocument(conf.appWrieDatabaseId,conf.appWrieCollectionId,slug);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getDocument(slug){
        try {
            return await this.databases.getDocument(conf.appWrieDatabaseId,conf.appWrieCollectionId,slug);
        } catch (error) {
            return error;
        }
    }

    async listDocuments(queries = [Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(conf.appWrieDatabaseId,conf.appWrieCollectionId,queries)
        } catch (error) {
            return error;
        }
    }

    //File Uploading

    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appWrieBucketId,ID.unique(),file);
        } catch (error) {
            return error;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appWrieBucketId,fileId);
            return true
        } catch (error) {
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appWrieBucketId,fileId);
    }
}

const service = new Service();

export default service;