export const requestGroq = async (content: string): Promise<string> => {
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch response");
    }

    return data.response;
  } catch (error) {
    console.error("Error fetching Groq API:", error);
    return "Maaf, terjadi kesalahan.";
  }
};
