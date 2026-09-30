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

export function searchCustomers(search) {
    return request(
        `/api/customers/search?search=${encodeURIComponent(search)}`,
    );
}

export function searchProducts(search) {
    return request(`/api/products/search?search=${encodeURIComponent(search)}`);
}

export function createSale(sale) {
    return request("/api/sales", {
        method: "POST",
        body: JSON.stringify(sale),
    });
}

export function getSale(id) {
    return request(`/api/sales/${id}`);
}
