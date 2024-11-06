import Gallery from "./Components/Gallery";
import { createClient } from "@supabase/supabase-js";
import styles from "./styles.module.scss";
import Header from "./Components/Header";
import ButtonTop from "./Components/ButtonTop";


type Image = {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
};

export default async function Home() {
  //-> Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabaseAdmin
    .from("images")
    .select("*")
    .order("id");

  if (error) {
    console.error("Error fetching images:", error);
    return { notFound: true };
  }

  const images = data as unknown;

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
      <ButtonTop />
    </div>

    </main>
  );
}
