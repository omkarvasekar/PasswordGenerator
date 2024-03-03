import { useState, useCallback, useEffect, useRef } from 'react'


function App() {

  const [length, setlength] = useState(8);
  const [noAllow, setnoAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (noAllow) {
      str += "012345678"
    }
    if (charAllow) {
      str += "!#$%&@()*+,-./"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)
  }, [length, noAllow, charAllow, setPassword])


  const CopytoClip = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])



  useEffect(() => { passwordGenerator() }, [length, noAllow, charAllow, passwordGenerator])

  return (
    <>
      <h1 className='text-4xl text-center text-white'>Password Generator</h1>
      <div className='w-full  max-w-md mx-auto shadow-md rounded-lg px-4 my-8  bg-gray-700'>
        <h1 className='text-white text-center my-4'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password} readOnly ref={passwordRef} className='outline-none w-full py-1 px-3 text-black' placeholder='Password' />
          <button onClick={CopytoClip} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 transition ease-in-out delay-150hover:-translate-y-1 hover:scale-110 duration-300 '  >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 py-1 my-2 mx-2'>
            <input type='range' min={6} max={20} value={length} className='cursor-pointer' onChange={(e) => { setlength(e.target.value) }} />
            <label className='text-white'>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1 py-1 my-2 mx-2'>
            <input type='checkbox' defaultChecked={noAllow} id="numberInput" onChange={() => { setnoAllow((prev) => !prev) }} />
            <label className="text-white" htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 py-1 my-2 mx-2'>
            <input type='checkbox' defaultChecked={charAllow} id="charInput" onChange={() => { setcharAllow((prev) => !prev) }} />
            <label className="text-white" htmlFor='charInput'>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
