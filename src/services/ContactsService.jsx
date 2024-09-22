import delay from "../utils/delay";
import HttpClient from "./utils/HttpClient";

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient(import.meta.env.VITE_API_URL)
  }

  listContacts(orderBy = "asc") {
    return this.httpClient.get(`/contacts/?orderBy=${orderBy}`);
  }

  async getContactById(id) {
    await delay(3000)
    return this.httpClient.get(`/contacts/${id}`)
  }

  createContact(contact) {
    return this.httpClient.post('/contacts',{ body: contact })
  }

  updateContact(id, contact) {
    return this.httpClient.put(`/contacts/${id}`,{ body: contact })
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`)
  }
}

export default new ContactsService();
