import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react'
import GUI from 'lil-gui'

interface GuiContextType {
  gui: GUI | null
}
const GuiContext = createContext<GuiContextType>({ gui: null })

export const useGui = () => {
  const { gui } = useContext(GuiContext)

  if (!gui) {
    throw new Error('useGui must be used within a GuiProvider')
  }

  return gui
}

interface GuiProviderProps {
  children: React.ReactNode
}

export const GuiProvider = ({ children }: GuiProviderProps) => {
  // const gui = useRef<GUI | null>(null)
  const [gui, setGui] = useState<GUI | null>(null)

  useEffect(() => {
    const newGui = new GUI()
    if (!gui) {
      setGui(() => newGui)
    }

    if (gui) {
      return () => {
        gui.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(() => ({ gui }), [gui])

  return (
    <GuiContext.Provider value={value}>
      {gui && <GuiContainer gui={gui} />}
      {children}
    </GuiContext.Provider>
  )
}

type GuiContainerProps = Readonly<{
  gui: GUI
}>

function GuiContainer({ gui }: GuiContainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && gui) {
      ref.current.appendChild(gui.domElement)
    }
    return () => {
      if (ref.current) {
        ref.current.innerHTML = ''
      }
    }
  }, [gui])

  return (
    <div
      ref={ref}
      style={{ position: 'absolute', display: 'block', top: 0, right: 0 }}
    />
  )
}
