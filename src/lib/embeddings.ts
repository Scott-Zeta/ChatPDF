import {OpenAIApi, Configuration} from 'openai-edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export async function getEmbedding(text: string) {
    try {
        const response = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: text
        })
        const result = await response.json()
        if(!result.data){
            console.error('error calling openai embedding api', result)
            throw new Error('error calling openai embedding api', result)
        }
        return result.data[0].embedding as number[]
    } catch (error) {
        console.error('error calling openai embedding api', error)
        throw error
    }
}