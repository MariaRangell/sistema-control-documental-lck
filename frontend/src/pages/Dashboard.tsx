import { FileText, Users, Clock, CheckCircle } from 'lucide-react'

const stats = [
  { name: 'Documentos Totales', value: '1,234', icon: FileText },
  { name: 'Usuarios Activos', value: '45', icon: Users },
  { name: 'Documentos Pendientes', value: '23', icon: Clock },
  { name: 'Documentos Aprobados', value: '1,211', icon: CheckCircle },
]

export default function Dashboard() {
<<<<<<< HEAD
=======
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedItems, setAnimatedItems] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedItems(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20
    });
  };

  const navigateTo = (section: string, event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    element.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      element.style.transform = '';
      console.log('Navegando a:', section);
    }, 150);
  };

>>>>>>> 6dec2c8 (Dashboard corregido v2)
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
              </dd>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">
          Actividad Reciente
        </h2>
        <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li key={item} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                          <FileText className="h-5 w-5 text-gray-500" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          Documento #{item} actualizado
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          Actualizado por Usuario {item}
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Completado
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 