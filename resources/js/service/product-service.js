async function request(url, options = {}) {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
            ...options.headers,
        },
    });

    const data = await response.json();

    return {
        status: response.status,
        data,
    };
}

export function createProduct(product) {
    return request("/api/products", {
        method: "POST",
        body: JSON.stringify(product),
    });
}

export function updateProduct(id, product) {
    return request(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(product),
    });
}

export function deleteProduct(id) {
    return request(`/api/products/${id}`, {
        method: "DELETE",
    });
}
