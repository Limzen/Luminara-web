import { GoogleGenerativeAI } from '@google/generative-ai';

// System prompt untuk konteks wisata religi Medan
const SYSTEM_PROMPT = `Kamu adalah Luminara AI, asisten virtual yang ahli dalam wisata religi di Kota Medan, Sumatera Utara, Indonesia.

Tugas utama kamu:
- Memberikan informasi tentang tempat-tempat wisata religi di Medan (Masjid, Vihara, Gereja, Kuil, dll)
- Merekomendasikan itinerary perjalanan wisata religi
- Memberikan informasi jam buka, lokasi, dan tips berkunjung
- Menjelaskan sejarah dan signifikansi spiritual dari tempat-tempat ibadah

Beberapa tempat wisata religi terkenal di Medan:
1. Masjid Raya Al Mashun - Masjid bersejarah dengan arsitektur Maroko, Persia, dan Spanyol
2. Vihara Maitreya Cemara Asri - Vihara Buddha terbesar di Asia Tenggara
3. Gereja Immanuel (GPIB Immanuel) - Gereja bersejarah bergaya kolonial Belanda
4. Graha Maria Annai Velangkanni - Gereja dengan arsitektur Indo-Mughal yang unik
5. Kuil Sri Mariamman - Kuil Hindu tertua di Medan
6. Vihara Gunung Timur - Vihara Buddha tertua di Medan

Gaya komunikasi:
- Gunakan Bahasa Indonesia yang ramah dan sopan
- Berikan informasi yang akurat dan bermanfaat
- Tambahkan emoji secukupnya untuk membuat percakapan lebih friendly
- Jika ditanya di luar topik wisata religi Medan, tetap jawab dengan sopan tapi arahkan kembali ke topik utama`;

// Store conversation history for context
let conversationHistory = [];

/**
 * Send a message to Gemini AI and get a response
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} - The AI response
 */
export async function sendMessageToGemini(userMessage) {
    try {
        // Check if API key is configured
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        console.log('API Key exists:', !!apiKey);
        console.log('API Key length:', apiKey?.length || 0);

        if (!apiKey) {
            return "⚠️ API Key belum dikonfigurasi. Silakan tambahkan VITE_GEMINI_API_KEY di file .env Anda.\n\nDapatkan API Key gratis di: https://aistudio.google.com/apikey";
        }

        // Initialize Gemini API with the key
        const genAI = new GoogleGenerativeAI(apiKey);

        // Get the generative model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
        });

        // Build conversation context
        const contextMessages = conversationHistory.slice(-10).map(msg =>
            `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        ).join('\n');

        // Create the full prompt with system context
        const fullPrompt = `${SYSTEM_PROMPT}

Percakapan sebelumnya:
${contextMessages}

User: ${userMessage}

Berikan respons yang helpful dan informatif:`;

        // Generate content
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const aiResponse = response.text();

        // Update conversation history
        conversationHistory.push(
            { role: 'user', content: userMessage },
            { role: 'assistant', content: aiResponse }
        );

        return aiResponse;

    } catch (error) {
        console.error('Gemini API Error:', error);
        console.error('Error details:', error.name, error.message);

        // Handle specific error types
        if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('invalid')) {
            return "❌ API Key tidak valid. Silakan periksa kembali VITE_GEMINI_API_KEY di file .env Anda.";
        }

        if (error.message?.includes('QUOTA_EXCEEDED') || error.message?.includes('quota')) {
            return "⚠️ Kuota API terlampaui. Silakan coba lagi nanti atau gunakan API key lain.";
        }

        if (error.message?.includes('SAFETY')) {
            return "⚠️ Maaf, saya tidak bisa memproses permintaan tersebut. Silakan coba pertanyaan lain tentang wisata religi di Medan.";
        }

        if (error.message?.includes('fetch') || error.message?.includes('network') || error.message?.includes('Failed')) {
            return "🌐 Gagal terhubung ke server. Periksa koneksi internet Anda dan coba lagi.";
        }

        return `😔 Terjadi kesalahan: ${error.message || 'Unknown error'}`;
    }
}

/**
 * Clear conversation history
 */
export function clearConversationHistory() {
    conversationHistory = [];
}

/**
 * Get current conversation history
 * @returns {Array} - Array of conversation messages
 */
export function getConversationHistory() {
    return [...conversationHistory];
}
