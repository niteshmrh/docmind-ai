export interface StorageService {
    save(file: Express.Multer.File): Promise<string>;
    delete(filePath: string): Promise<void>;
}