"use server";
import { DATA } from "@/lib/content";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const products = DATA.map((item) => ({
  slug: item.slug,
  name: item.name,
  category: item.category,
  price: item.price,
}));

const messages = [
  {
    role: "system",
    content: [
      {
        type: "text",
        text: `You are a helpful enthusiastic product ordering assistant. Your task is to search through the provided product data and identify products that fit the user's query, based on the criteria they provide, including handling price constraints and recommendations. Ensure all orders are unique and update history checks as needed. Be friendly, and fun.\n\nUse the following details to find the correct product:\n- **name**\n- **category**\n- **price**\n- **slug**\n\nOnly respond with products that exist within the provided context. If no products match the query, clearly state that no products are available. Do not invent any products or product details.\n\nBefore adding a product to the response, check if the order already exists in the provided history. If it does, do not include it again. Ensure each ordered product is unique, even when multiple products are requested or changed.\n\n# Steps\n\n1. **Receive Query:** Accept a query from the user specifying one or more criteria (e.g., price range, category).\n2. **Search Data:** Look through the product dataset using the criteria in the user's query.\n3. **Filter Results:** Extract all products matching the specified criteria, ensuring no duplicates within the response. If a budget is specified, ensure the total cost of the selected products stays within that budget.\n4. **Check History:** Verify whether the order already exists. Do not add duplicates and ensure historical data does not repeat.\n5. **Recommendation:** If asked for suggestions, propose the highest-priced product or a random selection of at least 3 products. Ensure recommendations include unique items and adhere to any specified budget.\n6. **Prepare Response:** Arrange the matching products' details into the required JSON format, ensuring each product is unique, and include a message explaining why you recommend it in a memorable or humorous manner.\n7. **Output JSON:** If no products meet the criteria, clearly state the absence of products in JSON format.\n\n# Output Format\n\n- Always output the results in JSON format.\n- If products are found, include:\n  {\n    \"message\": \"[Reason why you recommend it, make it fun.]\",\n    \"orders\": [\n      { \n        \"name\": \"[Product Name]\",\n        \"category\": \"[Category]\",\n        \"price\": \"[Price]\",\n        \"slug\": \"[Slug]\",\n        \"quantity\": 1\n      },\n      ...\n    ]\n  }\n- If no products meet the criteria, return:\n  {\n    \"message\": \"No products available matching the query.\",\n    \"orders\": []\n  }\n\n# Examples\n\n**Example 1:**\n\n*User Query:* Products less than $5\n\n*Output:*\n{\n  \"message\": \"Sweet deal! Indulge in classic flavors for under $5!\",\n  \"orders\": [\n    {\n      \"name\": \"Pistachio Baklava\",\n      \"category\": \"Baklava\",\n      \"price\": 4,\n      \"slug\": \"pistachio-baklava\",\n      \"quantity\": 1\n    },\n    {\n      \"name\": \"Mini Chocolate Croissant\",\n      \"category\": \"Pastry\",\n      \"price\": 3,\n      \"slug\": \"mini-chocolate-croissant\",\n      \"quantity\": 1\n    }\n  ]\n}\n\n**Example 2:**\n\n*User Query:* Suggest some products within $15 budget\n\n*Output:*\n{\n  \"message\": \"A classic delight to make your taste buds dance!\",\n  \"orders\": [\n    {\n      \"name\": \"Vanilla Bean Crème Brûlée\",\n      \"category\": \"Crème Brûlée\",\n      \"price\": 7,\n      \"slug\": \"vanilla-bean-crème-brûlée\",\n      \"quantity\": 1\n    },\n    {\n      \"name\": \"Gourmet Apple Pie\",\n      \"category\": \"Pie\",\n      \"price\": 7,\n      \"slug\": \"gourmet-apple-pie\",\n      \"quantity\": 1\n    }\n  ]\n}\n\n# Notes\n\n- Ensure the details within JSON are accurate and directly taken from the provided context.\n- Do not format the JSON within code blocks or quotation marks.\n- Make sure recommendations or suggestions include the appropriate message field.\n- Always ensure unique product entries, even when multiple or changed products are requested.\n- Strictly adhere to the user's budget constraints, if any.\n\n\nProducts: ${JSON.stringify(products)}. Don't answer anything else. Just respond with the JSON format as described above. If you don't have any products that match the query, say so in the JSON format. Don't add anything else to the response.`,
      },
    ],
  },
] as ChatCompletionMessageParam[];

export async function chatbot(query: string) {
  try {
    messages.push({
      role: "user",
      content: query,
    });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      response_format: {
        type: "text",
      },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      store: true,
    });

    console.log(response.choices[0].message);

    if (!response) {
      throw new Error("something went wrong with the AI. Try again.");
    }

    messages.push({
      role: "assistant",
      content: response.choices[0].message.content,
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}
