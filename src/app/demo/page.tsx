import { MemoryCard } from "@/components/generic/MemoryCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        Card with random dummy data:      
        <MemoryCard
          title={"Visit to Dinosaur Museum peanuts peanuts pie"}
          description={"Visiting the dinosaur museum was awesome. I took some images that look suspiciously like Wikipedia images but trust me I totally visited the museum for real!"}
          link={"https://www.facebook.com/doubledutchfries/"}
          date={"2 Aug 2025"}
          location="Facebook"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          videos={[
            {
                src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            }
          ]}
          images={[
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frenguellisaurus_ischigualastensis_DSC_6185.jpg/330px-Frenguellisaurus_ischigualastensis_DSC_6185.jpg",  
              alt: "Illustration: scale comparison of basal ceratopsia"  
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Triceratops_Specimen_at_the_Houston_Museum_of_Natural_Science_v01.jpg/330px-Triceratops_Specimen_at_the_Houston_Museum_of_Natural_Science_v01.jpg",  
              alt: "Restoration drawing of Thecodontosaurus"  
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Stegosaurus_ungulatus.jpg/330px-Stegosaurus_ungulatus.jpg",  
              alt: "Centrosaurus illustration (public domain)"  
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Hadrosauridae_-_Edmontosaurus_annectens.JPG/330px-Hadrosauridae_-_Edmontosaurus_annectens.JPG",  
              alt: "Life restoration of Alaskacephale"  
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/MicroraptorGui-PaleozoologicalMuseumOfChina-May23-08.jpg/330px-MicroraptorGui-PaleozoologicalMuseumOfChina-May23-08.jpg",  
              alt: "Mounted Triceratops horridus skeleton"  
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Neognathae.jpg/500px-Neognathae.jpg",  
              alt: "Cryolophosaurus skeleton mount"  
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/LA-Triceratops_mount-2.jpg/500px-LA-Triceratops_mount-2.jpg",  
              alt: "T. rex skeleton at Carnegie Museum"  
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Dromaeosaurus_skull_en.svg/500px-Dromaeosaurus_skull_en.svg.png",  
              alt: "Herrerasaurus ischigualastensis mounted fossil"  
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Sprawling_and_erect_hip_joints_-_horizontal.svg/375px-Sprawling_and_erect_hip_joints_-_horizontal.svg.png",  
              alt: "Plateosaurus engelhardti articulated fossil skeleton"  
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Dr._Bob_Bakker_with_Dino.jpg/500px-Dr._Bob_Bakker_with_Dino.jpg",  
              alt: "Velociraptor mongoliensis life restoration with feathers"  
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Psittacosaurus_%28Vinther_et_al._2016%2C_cropped%29.png/330px-Psittacosaurus_%28Vinther_et_al._2016%2C_cropped%29.png",  
              alt: "Pachycephalosaurus skull mount"  
            }
          ]}
        />
      </main>
    </div>
  );
}
