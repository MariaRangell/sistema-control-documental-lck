import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import {
  FileText, Users, Settings, LayoutDashboard, DollarSign, FolderOpen,
  Monitor, FolderKey, ArrowLeftRight, Building2, Scale, FileDigit,
  Database, FileClock
} from 'lucide-react'

type UserRole = 'admin' | 'cliente' | 'proveedor' | 'rh' | 'empresa' | 'auditoria'
type UserData = { nombre: string; rol: UserRole }
type NavItem = { name: string; href: string; icon: React.ElementType }
type NavByRole = Partial<Record<UserRole, NavItem[]>>

const navByRole: NavByRole = {
  admin: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Documentos', href: '/documents', icon: FileText },
    { name: 'Usuarios', href: '/users', icon: Users },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
  empresa: [
    { name: 'Finanzas', href: '#', icon: DollarSign },
    { name: 'Facturación', href: '#', icon: FileDigit },
    { name: 'Legal', href: '#', icon: Scale },
    { name: 'Infraestructura', href: '#', icon: Building2 },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
  rh: [
    { name: 'Nómina', href: '#', icon: DollarSign },
    { name: 'Contratos', href: '#', icon: FileText },
    { name: 'Expedientes', href: '#', icon: FolderOpen },
    { name: 'Equipos', href: '#', icon: Monitor },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
  cliente: [
    { name: 'Contabilidad', href: '#', icon: DollarSign },
    { name: 'Contratos', href: '#', icon: FileText },
    { name: 'Expedientes', href: '#', icon: FolderOpen },
    { name: 'Facturas', href: '#', icon: FileDigit },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
  proveedor: [
    { name: 'Contabilidad', href: '#', icon: DollarSign },
    { name: 'Contratos', href: '#', icon: FileText },
    { name: 'Expedientes', href: '#', icon: FolderOpen },
    { name: 'Facturas', href: '#', icon: FileDigit },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
  auditoria: [
    { name: 'Accesos', href: '#', icon: FolderKey },
    { name: 'Discrepancias', href: '#', icon: ArrowLeftRight },
    { name: 'Base de Datos', href: '#', icon: Database },
    { name: 'Monitoreo', href: '#', icon: FileClock },
    { name: 'Configuración', href: '/settings', icon: Settings },
  ],
}

function getSubItems(itemName: string, rol: UserRole) {
  const adminItems = { //Menu Aministrador
    'Empresa': [
      { name: 'Carga/Descarga', icon: '📤' },
      { name: 'Administración', icon: '⚙️' },
      { name: 'Recibos', icon: '🧾' },
      { name: 'Discrepancias', icon: '⚠️' },
    ],
    'Auditoria': [
      { name: 'Altas/Bajas', icon: '👥' },
      { name: 'Carga/Descarga', icon: '📤' },
      { name: 'Pendientes', icon: '⏳' },
      { name: 'Base de Datos', icon: '🗄️' },
    ],
    'Recursos Humanos': [
      { name: 'Organigrama', icon: '🏢' },
      { name: 'Instalaciones', icon: '🏭' },
      { name: 'Inventarios', icon: '📋' },
      { name: 'Activos', icon: '💼' },
    ],
    'Configuración': [
      { name: 'Altas/Bajas', icon: '👥' },
      { name: 'Inventario', icon: '📋' },
      { name: 'Asignación', icon: '🎯' },
      { name: 'Status', icon: '📊' },
    ],
    'Clientes': [
      { name: 'Altas/Bajas', icon: '👥' },
      { name: 'Inventario', icon: '📋' },
      { name: 'Asignación', icon: '🎯' },
      { name: 'Status', icon: '📊' },
    ],
    'Proveedores': [
      { name: 'Altas/Bajas', icon: '👥' },
      { name: 'Inventario', icon: '📋' },
      { name: 'Asignación', icon: '🎯' },
      { name: 'Status', icon: '📊' },
    ]
  }
  const rhItems = { //Menu RH
    'Nómina': [
      { name: 'Carga/Descarga', icon: '📤' },
      { name: 'Administración', icon: '⚙️' },
      { name: 'Recibos', icon: '🧾' },
      { name: 'Discrepancias', icon: '⚠️' },
    ],
    'Contratos': [
      { name: 'Altas/Bajas', icon: '👥' },
      { name: 'Carga/Descarga', icon: '📤' },
      { name: 'Pendientes', icon: '⏳' },
      { name: 'Base de Datos', icon: '🗄️' },
    ],
    'Expedientes': [
      { name: 'Organigrama', icon: '🏢' },
      { name: 'Instalaciones', icon: '🏭' },
      { name: 'Inventarios', icon: '📋' },
      { name: 'Activos', icon: '💼' },
    ],
    'Equipos': [
      { name: 'Altas/Bajas', icon: '👥' },
      { name: 'Inventario', icon: '📋' },
      { name: 'Asignación', icon: '🎯' },
      { name: 'Status', icon: '📊' },
    ]
  }

  const empresaItems = {  //Menu empresa
    'Finanzas': [
      { name: 'Tesorería', icon: '📤' },
      { name: 'SAT', icon: '🏛️' },
      { name: 'Secretaria de Finanzas', icon: '🧾' },
      { name: 'Balances', icon: '⚖️' },
    ],
    'Infraestructura': [
      { name: 'Organigrama', icon: '🏢' },
      { name: 'Instalaciones', icon: '🏭' },
      { name: 'Inventarios', icon: '📋' },
      { name: 'Activos', icon: '💼' },
    ],
    'Legal': [
      { name: 'Permisos', icon: '🧾' },
      { name: 'Lineamientos', icon: '📋' },
      { name: 'SAT', icon: '🏛️' },
      { name: 'Aviso de registro REPSE', icon: '📤' },
    ],
    'Facturación': [
      { name: 'Altas/Bajas', icon: '👥' },
      { name: 'Carga/Descarga', icon: '📤' },
      { name: 'Base de Datos', icon: '🗄️' },
      { name: 'Refacturación', icon: '📋' },
    ]
  }
  const clienteItems = {  //Menu cliente
    'Contratos_c': [
      { name: 'Altas/Bajas', icon: '👥' },
      { name: 'Carga/Descarga', icon: '📤' },
      { name: 'Base de Datos', icon: '🗄️' },
      { name: 'Cumplimiento', icon: '✅' }
    ],
    'Expedientes_c': [
      { name: 'Acta Constitutiva', icon: '📜' },
      { name: 'Constancia de Situación Fiscal', icon: '🏛️' },
      { name: 'Servicios', icon: '🔧' },
    ],
    'Contabilidad_c': [
      { name: 'Balances', icon: '⚖️' },
      { name: 'Pagos', icon: '💳' },
      { name: 'Pendientes', icon: '⏳' },
      { name: 'Impuestos', icon: '🏛️' }
    ],
    'Facturas_c': [
      { name: 'Carga/Descarga', icon: '📤' },
      { name: 'Administración', icon: '⚙️' },
      { name: 'Pendientes', icon: '⏳' },
      { name: 'Discrepancias', icon: '⚠️' }
    ]
}
const proveedorItems = {  //Menu proveedor
    'Contratos_prov': [
      { name: 'Altas/Bajas', icon: '👥' },
      { name: 'Carga/Descarga', icon: '📤' },
      { name: 'Base de Datos', icon: '🗄️' },
      { name: 'Cumplimiento', icon: '✅' }
    ],
    'Expedientes_prov': [
      { name: 'Acta Constitutiva', icon: '📜' },
      { name: 'Constancia de Situación Fiscal', icon: '🏛️' },
      { name: 'Servicios', icon: '🔧' },
    ],
    'Contabilidad_prov': [
      { name: 'Balances', icon: '⚖️' },
      { name: 'Pagos', icon: '💳' },
      { name: 'Pendientes', icon: '⏳' },
      { name: 'Impuestos', icon: '🏛️' }
    ],
    'Facturas_prov': [
      { name: 'Carga/Descarga', icon: '📤' },
      { name: 'Administración', icon: '⚙️' },
      { name: 'Pendientes', icon: '⏳' },
      { name: 'Discrepancias', icon: '⚠️' }
    ]
    }
    const auditoriaItems = {  //Menu auditoria
    'Monitoreo': [
      { name: 'Rendimiento', icon: '📊' },
      { name: 'Procesos', icon: '📤' },
      { name: 'Alertas', icon: '⚠️' },
      { name: 'Reportes', icon: '🎯' }
    ],
    'Accesos': [
      { name: 'Conexiones', icon: '⚙️' },
      { name: 'Consultas', icon: '📋' },
      { name: 'Bajas', icon: '👥' },
      { name: 'Restricciones', icon: '⚠️' },
    ],
    'Base de Datos': [
      { name: 'Base de Datos', icon: '🗄️' },
      { name: 'Administración', icon: '💼' },
      { name: 'Reportar', icon: '⚠️' },
      { name: 'Capacidad', icon: '✅' }
    ],
    'Discrepancias': [
      { name: 'Cargas', icon: '📤' },
      { name: 'Estatus de los archivos', icon: '✅' },
      { name: 'Modificaciones', icon: '📋' },
      { name: 'Avisos', icon: '⚠️' }
    ]
    }
  if (rol === 'rh') return rhItems[itemName] || []
  if (rol === 'empresa') return empresaItems[itemName] || []
  if (rol === 'cliente') return clienteItems[itemName] || []
  if (rol === 'proveedor') return proveedorItems[itemName] || []
  if (rol === 'auditoria') return  auditoriaItems[itemName] || []
  if (rol === 'admin') return  adminItems[itemName] || []
  return []
}

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<UserData>({ nombre: '', rol: 'admin' })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const navigation: NavItem[] = navByRole[user.rol] || []

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6">
            <img src="/logo1.png" alt="LCK Consultores" className="h-16 w-auto" />
            <nav className="sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                const subItems = getSubItems(item.name, user.rol)

                if (subItems.length > 0) {
                  return (
                    <div key={item.name} className="relative group inline-block text-left">
                      <button className="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-black border-transparent hover:border-gray-300 hover:text-gray-700 focus:outline-none">
                        <item.icon className="mr-2 h-5 w-5 text-black" />
                        {item.name}
                        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className="pointer-events-none group-hover:pointer-events-auto absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                        <div className="py-1">
                          {subItems.map((subItem, index) => (
                            <Link key={index} to="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700">
                              <span className="mr-2">{subItem.icon}</span>
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-black ${
                      isActive ? 'border-indigo-500' : 'border-transparent hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <item.icon className="mr-2 h-5 w-5 text-black" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-700">{user.nombre}</span>
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      <div className="pt-16">
        <main className="py-10">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
