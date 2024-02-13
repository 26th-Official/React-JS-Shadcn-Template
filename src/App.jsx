import { Button } from "@/components/ui/button.tsx"
import { useState } from "react"

const App = () => {
	const [state, setState] = useState(0)
  return (
	<div className='w-screen h-screen bg-slate-900 flex flex-col space-y-2 items-center justify-center'>
		<p className="p-3 px-5 flex items-center justify-center rounded-md text-xl bg-slate-700">{state}</p>
		<p className="text-2xl">React JS Shadcn template</p>
		<Button onClick={() => {
			setState(prev => prev + 1)
		}} className="bg-blue-400 hover:bg-blue-900">Click me</Button>
	</div>
  )
}

export default App