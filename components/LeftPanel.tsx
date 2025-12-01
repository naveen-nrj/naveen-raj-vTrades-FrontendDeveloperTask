
export default function LeftPanel({image="/banner-img.svg"}: {image?: string} ) {
  return (
    // hidden by default; used for displaying the left image
    <aside className="flex flex-1 items-stretch justify-center p-8">
      <div
        className="
          h-[90vh]             
          w-full
          max-w-[700px]        
          flex items-center justify-center
        "
      >
        <img
          src={image}
          alt="WorkHive Banner"
          className="
            max-h-full          
            w-auto              
            object-contain      
            block
          "
        />
      </div>
    </aside>
  );
}