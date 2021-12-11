import http from "../http-common";

class ProductDataService {
    getAll(params) {
        return http.get("/products", { params });
    }
    getAllTest() {
        return http.get("/products/all");
    }
    get(id) {
        return http.get(`/tutorials/${id}`);
    }

    create(data) {
        return http.post("/tutorials", data);
    }

    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }

    delete(id) {
        return http.delete(`/tutorials/${id}`);
    }

    deleteAll() {
        return http.delete("/tutorials");
    }
}

export default new ProductDataService();