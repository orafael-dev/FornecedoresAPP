import HttpClient from "./utils/HttpClient";

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient(import.meta.env.VITE_API_URL);
  }

  listCategories() {
    return this.httpClient.get("/categories");
  }
}

export default new CategoriesService();
