
interface WidgetProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode
}
const Widget = ({ children, className }: WidgetProps) => {
  return (
    <div className={className ?? 'border border-solid border-slate-100 px-4 py-3 rounded-md h-full'}>
        {children}
    </div>
  )
}

export default Widget