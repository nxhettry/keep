"use server";

export const FilterData = async (formData: FormData) => {
    const option = formData.get("option");
    console.log(option);
}