import { showErrorToast } from "../component/react_toaster/toasterHandler";

export const requestGroq = async (content: string): Promise<string> => {
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to fetch response");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error fetching Groq API:", error);
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      showErrorToast("Something went wrong, try again in the afterlife!");
    } else {
      showErrorToast();
    }
    return "Something went wrong, try again in the afterlife!";
  }
};
