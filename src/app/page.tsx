import Gallery from "./Components/Gallery";
import { createClient } from "@supabase/supabase-js";
import styles from "./styles.module.scss";
import Header from "./Components/Header";


//tipo de dados da imagem
type Image = {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
};

export default async function Home() {
  //variáveis de ambiente -> Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  //cliente Supabase
  const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

  //busca imagens
  const { data, error } = await supabaseAdmin
    .from("images")
    .select("*")
    .order("id");

  //erro na busca
  if (error) {
    console.error("Error fetching images:", error);
    return { notFound: true };
  }

  //formato esperado
  const images = data as unknown;

  //dados recebidos
  if (
    !Array.isArray(images) ||
    !images.every(
      (item) => "id" in item && "imageSrc" in item && "name" in item
    )
  ) {
    console.error("Data format is not valid:", images);
    return { notFound: true };
  }

  return (
    <main>
      <Header/>
    <div className={styles.grid}>
      <Gallery images={images as Image[]} />
    </div>

    </main>
  );
}
