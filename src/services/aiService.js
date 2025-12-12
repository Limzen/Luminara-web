import Groq from 'groq-sdk';

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

// Rate limit tracking
let rateLimitResetTime = null;

/**
 * Check if we're currently rate limited
 * @returns {object|null} - Rate limit info or null
 */
export function checkRateLimit() {
    if (rateLimitResetTime && Date.now() < rateLimitResetTime) {
        const remainingSeconds = Math.ceil((rateLimitResetTime - Date.now()) / 1000);
        return { limited: true, remainingSeconds };
    }
    rateLimitResetTime = null;
    return { limited: false, remainingSeconds: 0 };
}

/**
 * Send a message to Groq AI and get a response
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} - The AI response
 */
export async function sendMessageToAI(userMessage) {
    try {
        // Check rate limit first
        const rateLimit = checkRateLimit();
        if (rateLimit.limited) {
            return `⏳ Mohon tunggu **${rateLimit.remainingSeconds} detik** lagi sebelum mengirim pesan.\n\nLimit ini diperlukan untuk menjaga kualitas layanan gratis.`;
        }

        // Check if API key is configured
        const apiKey = import.meta.env.VITE_GROQ_API_KEY;
        console.log('Groq API Key exists:', !!apiKey);

        if (!apiKey) {
            return "⚠️ API Key belum dikonfigurasi. Silakan tambahkan VITE_GROQ_API_KEY di file .env Anda.\n\nDapatkan API Key gratis di: https://console.groq.com";
        }

        // Initialize Groq client
        const groq = new Groq({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true // Required for browser-based usage
        });

        // Build messages array with conversation history
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory.slice(-10),
            { role: 'user', content: userMessage }
        ];

        // Call Groq API
        const chatCompletion = await groq.chat.completions.create({
            messages: messages,
            model: 'llama-3.1-8b-instant', // Fast and free model
            temperature: 0.7,
            max_tokens: 1024,
        });

        const aiResponse = chatCompletion.choices[0]?.message?.content || 'Maaf, tidak ada respons dari AI.';

        // Update conversation history
        conversationHistory.push(
            { role: 'user', content: userMessage },
            { role: 'assistant', content: aiResponse }
        );

        return aiResponse;

    } catch (error) {
        console.error('Groq API Error:', error);
        console.error('Error details:', error.name, error.message);

        // Handle rate limit error
        if (error.message?.includes('rate_limit') || error.message?.includes('429') || error.status === 429) {
            // Set rate limit for 60 seconds
            rateLimitResetTime = Date.now() + 60000;
            return "⏳ Terlalu banyak request. Silakan tunggu **1 menit** lalu coba lagi.\n\nGroq free tier memiliki limit 30 request/menit.";
        }

        // Handle specific error types
        if (error.message?.includes('invalid_api_key') || error.message?.includes('401')) {
            return "❌ API Key tidak valid. Silakan periksa kembali VITE_GROQ_API_KEY di file .env Anda.";
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

