import axios from "axios";

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export type Level = 'A1 Beginner' | 'A2 Elementary' | 'B1 Intermediate' | 'B2 Upper-Intermediate' | 'C1 Advanced' | 'C2 Proficient';

export interface Teacher {
  id?: string;
  name: string;
  surname: string;
  languages: string[];
  levels: Level[];
  rating: number;
  reviews?: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}

export interface FilterParams {
  language?: string;
  level?: Level;
  price_per_hour?: number;
}

export type TeachersResponse = {
    total: number;
    items: Teacher[];
};


axios.defaults.baseURL = "https://language-teachers-default-rtdb.europe-west1.firebasedatabase.app/";

const res = await axios.get("/teachers.json");
console.log("Firebase raw data:", res.data);

export const getTeachers = async (
    page: number = 1, 
    limit: number = 4, 
    filters: FilterParams = {} 
): Promise<TeachersResponse> => {  
    try {
        const res = await axios.get<Teacher[] | Record<string, Teacher>>("/.json");

        let allTeachers: Teacher[] = Array.isArray(res.data) 
            ? res.data 
            : Object.entries(res.data || {}).map(([id, data]) => ({ ...data, id }));
        
        if (filters.language) {
            allTeachers = allTeachers.filter(t => t.languages.includes(filters.language!));
        }
        if (filters.level) {
            allTeachers = allTeachers.filter(t => t.levels.includes(filters.level!));
        }
        if (filters.price_per_hour) {
            allTeachers = allTeachers.filter(t => t.price_per_hour <= filters.price_per_hour!);
        }

        const total = allTeachers.length;
        const startIndex = (page - 1) * limit;
        const items = allTeachers.slice(startIndex, startIndex + limit);

        return { items, total };
    } catch (error: unknown) {
        console.error("API error:", error);
        return { items: [], total: 0 };
    }
};

export const getTeacherById = async (id: string): Promise<Teacher | null> => {
    try {
        const res = await axios.get<Teacher>(`/teachers/${id}.json`);
        return res.data ? { ...res.data, id } : null;
    } catch (error) {
        console.error("Error fetching teacher by id:", error);
        return null;
    }
};