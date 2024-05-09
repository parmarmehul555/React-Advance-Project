import conf from '../conf.js'
import {Client,Account,ID} from 'appwrite';

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appWrieURL).setProject(conf.appWrieProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                this.login(email,password)
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            return error;
        }

        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            return error;
        }
    }
}

const authService = new AuthService();

export default authService;