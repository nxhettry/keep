"use server";

export const FilterData = async (formData: FormData) => {
    const option = formData.get("option");
    console.log(option);
}

export const SaveData = async (formData: FormData) => {
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");

    console.log("Data received : ", title, content, category);
}