import { ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'

const StoryModal = ({setShowModel , fetchStories}) => {
   const bgColors = [
  "#4f46e5", // Indigo
  "#7c3aed", // Purple
  "#db2777", // Pink
  "#e11d48", // Red
  "#ca8a04", // Yellow/Amber
  "#0d9488", // Teal

  "#2563eb", // Blue
  "#14b8a6", // Cyan
  "#22c55e", // Green
  "#84cc16", // Lime
  "#f59e0b", // Orange
  "#d97706", // Amber
  "#ef4444", // Bright Red
  "#ec4899", // Fuchsia
  "#8b5cf6", // Violet
  "#6366f1", // Indigo Light
  "#3b82f6", // Sky Blue
  "#06b6d4", // Turquoise
  "#10b981", // Emerald
  "#f43f5e", // Rose
];
    const [mode , setMode] = useState("text")
    const [bg , setBg] = useState(bgColors[0])
    const [text  , setText] = useState("");
    const [media , setMedia] = useState(null);
    const [preview_url , setPreiview_url] = useState(null);

    const handleMediaUpload = (e) =>{

        const file = e.target.files?.[0];
        if(file){
            setMedia(file);
            setPreiview_url(URL.createObjectURL(file))
        }
    }

    const handleCreateStory =async () =>{

    }


  return (
    <div className='fixed inset-0 z-110 min-h-screen bg-black/80 backdrop:-blur text-white flex items-center justify-center p-4'>
        <div className='w-full max-w-md'>
            <div className='text-center mb-4 flex items-center justify-between'>
                <button onClick={()=>setShowModel(false)} className='text-white p-2 cursor-pointer'>
                    <ArrowLeft />
                </button>
                <h2 className='text-lg font-semibold'>Create Story</h2>
                <span className='w-10'></span>
            </div>
            <div className='rounded-lg h-96 flex item-center justify-center relative' style={{backgroundColor : bg}}>
                {mode=== "text" && (
                    <textarea className='bg-transparent text-white w-full h-full p-6 text-lg resize-none focus-outline' placeholder="What's on your mind"
                    onChange={(e)=>setText(e.target.value)} value={text}>

                    </textarea>
                )}
                { mode === 'media' && preview_url && (
                    media?.type.startsWith('image') ? (
                        <img src={preview_url} alt="" className='object-contain max-h-full'/>
                    ) : (
                        <video src={preview_url} className='object-contain max-h-full'/>
                    )
                )}
            </div>
            <div className='flex gap-2 mt-4'>
                {bgColors.map((color)=>(
                    <button key={color}  className='size-4 rounded-full ring cursor-pointer' style={{backgroundColor: color}} onClick={()=>{ setBg(color)}}></button>

                )) }
            </div>
        </div>



      
    </div>
  )
}

export default StoryModal
