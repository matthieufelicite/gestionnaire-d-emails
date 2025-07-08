import { ref } from "vue";
import { getAccessToken } from "../libs/microsoftGraph";

export type Email = {
  id: string;
  subject: string;
  sender: { emailAddress: { name: string; address: string } };
  body: { content: string };
  description: string;
  receivedDateTime: string;
  avatarUrl?: string;
  deleted: boolean;
};

export const emails = ref<Email[]>([]);
export async function fetchAvatarsForEmails() {
  for (const email of emails.value) {
    try {
      const emailAddress = email.sender.emailAddress.address;

      // Simule une requête à Microsoft Graph
      const accessToken = await getAccessToken();
      const response = await fetch(
        `https://graph.microsoft.com/v1.0/users/${emailAddress}/photo/$value`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        email.avatarUrl = URL.createObjectURL(await response.blob());
      } else {
        //Image par défaut si l'avatar n'est pas trouvé
        email.avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          email.sender.emailAddress.name
        )}`;
      }
    } catch (error) {
      console.error("Erreur de chargement avatar:", error);
      email.avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        email.sender.emailAddress.name
      )}`;
    }
  }
}

export async function fetchEmails() {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(
      "https://graph.microsoft.com/v1.0/me/messages?$top=50&$orderby=receivedDateTime desc",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch emails");

    const data = await response.json();
    emails.value = data.value.map((msg: any) => ({
      id: msg.id,
      subject: msg.subject || "(No subject)",
      sender: {
        emailAddress: {
          name: msg.sender?.emailAddress?.name || "Unknown",
          address: msg.sender?.emailAddress?.address || "unknown@example.com",
        },
      },
      body: { content: msg.bodyPreview || "" },
      description: msg.bodyPreview?.substring(0, 100) + "..." || "",
      receivedDateTime: msg.receivedDateTime,
      deleted: false,
    }));

    await fetchAvatarsForEmails();
  } catch (error) {
    console.error("Error fetching emails:", error);
  }
}
