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

export function createCustomer(customer) {
    return request("/api/customers", {
        method: "POST",
        body: JSON.stringify(customer),
    });
}

export function updateCustomer(id, customer) {
    return request(`/api/customers/${id}`, {
        method: "PUT",
        body: JSON.stringify(customer),
    });
}

export function deleteCustomer(id) {
    return request(`/api/customers/${id}`, {
        method: "DELETE",
    });
}
