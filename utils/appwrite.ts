import { APP_WRITE_ID } from '@/app.constants'
import { Account, Storage, Client, Databases } from 'appwrite'

const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(APP_WRITE_ID);

export const account = new Account(client)
export const storage = new Storage(client)
export {ID} from 'appwrite'
export const db = new Databases(client)
