export default function AlertCard({ data }) {
  const navigate = function(){
    if(data.uri){
      window.open(data.uri,'_blank');
    }
  }
  return(
    <section className="bg-white rounded-md shadow-xl my-3 pt-2 pb-2 pl-[3vw] pr-[3vw] w-[90vw] lg:w-[36vw] cursor-pointer" onClick={navigate}>
        <h2 className="text-2xl font-bold text-gray-800 font-serif text-center mb-4">{data.severity}</h2>
        <h2 className="text-xl font-bold text-gray-700 font-serif text-center">{data.title}</h2>
        <p className="text-base font-normal mt-2 text-gray-600 font-serif text-center">{data.description}</p>
        <h3 className="text-base font-bold mt-2 text-gray-600 font-serif text-center">Effective Local:
        <strong className="font-normal text-gray-500">{data.effective_local}</strong>
         </h3>
        <h3 className="text-base font-bold mt-2 text-gray-600 font-serif text-center">Effective UTC:
        <strong className="font-normal text-gray-500">{data.effective_utc}</strong> 
        </h3>
        <h3 className="text-base font-bold mt-2 text-gray-600 font-serif text-center">Ends Local:
        <strong className="font-normal text-gray-500">{data.ends_local}</strong>
        </h3>
        <h3 className="text-base font-bold mt-2 text-gray-600 font-serif text-center">Ends UTC:
        <strong className="font-normal text-gray-500">{data.ends_utc}</strong>
        </h3>
        <h3 className="text-base font-bold mt-2 text-gray-600 font-serif text-center">Expires Local:
        <strong className="font-normal text-gray-500">{data.expires_local}</strong>
        </h3>
        <h3 className="text-base font-bold mt-2 text-gray-600 font-serif text-center">Expires UTC:
        <strong className="font-normal text-gray-500">{data.expires_utc}</strong>
        </h3>
        <h3 className="text-base font-bold mt-2 text-gray-600 font-serif text-center">Onset Local:
        <strong className="font-normal text-gray-500">{data.onset_local}</strong>
        </h3>
        <h3 className="text-base font-bold mt-2 text-gray-600 font-serif text-center">Onset UTC:
        <strong className="font-normal text-gray-500">{data.onset_utc}</strong>
        </h3>

        <h2 className="text-xl text-center font-bold text-gray-500 tracking-wide font-serif mt-4">Effected Regions:</h2>
        <ul className="flex flex-row flex-wrap gap-2 items-center justify-center  mt-2">
          {data.regions.map((region,index)=>{
            return <li key={index} className="text-md text-gray-500 font-normal font-serif lg:text-lg">{region}</li>
          })}
        </ul>
    </section>
  )
}
