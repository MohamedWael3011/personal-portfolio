import { Coffee, Flame,  Users2 } from "lucide-react"

export default function AboutColumns() {
  return (
    <div className="about_box grid grid-cols-3 gap-7 mt-16">
        <div className="flex gap-4 items-start justify-center">
            <Flame size={45} color="#D600D6" />

            <div className='grid gap-5'>
                <h3 className='f text-3xl'>40</h3>
                <span>Projects Completed</span>
                </div>
        </div>

        <div className="flex gap-4 items-start justify-center">
            <Coffee size={45} color="#D600D6"/>

            <div className='grid gap-5'>
                <h3 className='f text-3xl'>14</h3>
                <span>Satisfied clients</span>
                </div>
        </div>


        <div className="flex gap-4 items-start justify-center">
            <Users2 size={45} color="#D600D6"/>

            <div className='grid gap-5'>
                <h3 className='f text-3xl'>40</h3>
                <span>Projects Completed</span>
                </div>
        </div>
    </div>
  )
}
