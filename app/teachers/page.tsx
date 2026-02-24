import { getTeachers } from "@/lib/api";
import TeacherList from "@/components/TeachersList/TeachersList";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const TeachersPage = async ({ searchParams }: PageProps) => {
  const filters = await searchParams;

  const data = await getTeachers(1, 4, {
    language: typeof filters.language === 'string' ? filters.language : undefined,
  });

  if (!data || !data.items) {
    return (
      <section style={{ padding: '20px', textAlign: 'center' }}>
        <p>Failed to load teachers. Please try again later.</p>
      </section>
    );
  }

  return (
    <section>
      <TeacherList initialData={data} />
    </section>
  );
}

export default TeachersPage;