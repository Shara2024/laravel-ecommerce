async function request(url, data) {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    return {
        status: response.status,
        data: result,
    };
}

export function signIn(data) {
    return request("/signIn", data);
}

export function signUp(data) {
    return request("/signUp", data);
}
