import OllamaService from "../Embedding/OllamaService.js";
import SearchRepository from "../../Repositories/SearchRepository.js";

const SearchService = {

    async search(documentId: string, query: string, limit = 5) {
        const embedding = await OllamaService.embedding(query);
        return SearchRepository.similaritySearch(documentId, embedding, limit,);
    },

};

export default SearchService;