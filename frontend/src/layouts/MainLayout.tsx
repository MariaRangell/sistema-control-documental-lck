import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import {
  FileText, Users, Settings, LayoutDashboard, DollarSign, FolderOpen,
  Monitor, FolderKey, ArrowLeftRight, Building2, Scale, FileDigit,
  Database, FileClock
} from 'lucide-react'

type UserRole = 'admin' | 'empresa' | 'proveedor' | 'rh' | 'cliente' | 'auditoria'
type UserData = { nombre: string; rol: UserRole }
type NavItem = { name: string; href: string; icon: React.ElementType }
type NavByRole = Partial<Record<UserRole, NavItem[]>>
type SubItem = { name: string; icon: string; href?: string }

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

function getSubItems(itemName: string, rol: UserRole): SubItem[] {
  const adminItems: Record<string, SubItem[]> = { //MENU ADMINISTRADOR
    'Empresa': [
      { name: 'Finanzas', icon: '💰', href: '/empresa/finanzas' }, 
      { name: 'Infraestructura', icon: '🏭', href: '/empresa/infraestructura' },
      { name: 'Legal', icon: '🧾', href: '/empresa/legal' },
      { name: 'Facturación', icon: '📋', href: '/empresa/facturacion' },
    ],
    'Auditoria': [
      { name: 'Monitoreo', icon: '📊', href: '/auditoria/monitoreo' },
      { name: 'Accesos', icon: '🔑', href: '/auditoria/accesos' },
      { name: 'Base de Datos', icon: '🗄️', href: '/auditoria/base-datos' },
      { name: 'Discrepancias', icon: '⚠️', href: '/auditoria/discrepancias' },
    ],
    'Recursos Humanos': [
      { name: 'Contratos', icon: '📋', href: '/rh/contratos' },
      { name: 'Expedientes', icon: '📋', href: '/rh/expedientes' },
      { name: 'Nómina', icon: '💰', href: '/rh/nomina' },
      { name: 'Equipos', icon: '💻', href: '/rh/equipos' },
    ],
    'Configuración': [
      { name: 'Accesos', icon: '🔑', href: '/configuracion/accesos' },
      { name: 'Sistema', icon: '⚙️', href: '/configuracion/sistema' },
    ],
    'Clientes': [
      { name: 'Contratos', icon: '👥', href: '/clientes/contratos' },
      { name: 'Facturas', icon: '📋', href: '/clientes/facturas' },
      { name: 'Expedientes', icon: '💼', href: '/clientes/expedientes' },
      { name: 'Contabilidad', icon: '💰', href: '/clientes/contabilidad' },
    ],
    'Proveedores': [
      { name: 'Contratos', icon: '👥', href: '/proveedores/contratos' },
      { name: 'Facturas', icon: '📋', href: '/proveedores/facturas' },
      { name: 'Expedientes', icon: '💼', href: '/proveedores/expedientes' },
      { name: 'Contabilidad', icon: '💰', href: '/proveedores/contabilidad' },
    ]
  }

  const rhItems: Record<string, SubItem[]> = { //MENU RH
    'Nómina': [
      { name: 'Carga/Descarga', icon: '📤', href: '/rh/nomina/carga' },
      { name: 'Administración', icon: '⚙️', href: '/rh/nomina/admin' },
      { name: 'Recibos', icon: '🧾', href: '/rh/nomina/recibos' },
      { name: 'Discrepancias', icon: '⚠️', href: '/rh/nomina/discrepancias' },
    ],
    'Contratos': [
      { name: 'Altas/Bajas', icon: '👥', href: '/rh/contratos/altas-bajas' },
      { name: 'Carga/Descarga', icon: '📤', href: '/rh/contratos/carga' },
      { name: 'Pendientes', icon: '⏳', href: '/rh/contratos/pendientes' },
      { name: 'Base de Datos', icon: '🗄️', href: '/rh/contratos/base-datos' },
    ],
    'Expedientes': [
      { name: 'Organigrama', icon: '🏢', href: '/rh/expedientes/organigrama' },
      { name: 'Instalaciones', icon: '🏭', href: '/rh/expedientes/instalaciones' },
      { name: 'Inventarios', icon: '📋', href: '/rh/expedientes/inventarios' },
      { name: 'Activos', icon: '💼', href: '/rh/expedientes/activos' },
    ],
    'Equipos': [
      { name: 'Altas/Bajas', icon: '👥', href: '/rh/equipos/altas-bajas' },
      { name: 'Inventario', icon: '📋', href: '/rh/equipos/inventario' },
      { name: 'Asignación', icon: '🎯', href: '/rh/equipos/asignacion' },
      { name: 'Status', icon: '📊', href: '/rh/equipos/status' },
    ]
  }

  const empresaItems: Record<string, SubItem[]> = { //MENU EMPRESA
    'Finanzas': [
      { name: 'Tesorería', icon: '💰', href: '/empresa/finanzas/tesoreria' },
      { name: 'SAT', icon: '🏛️', href: '/empresa/finanzas/sat' },
      { name: 'Secretaria de Finanzas', icon: '🧾', href: '/empresa/finanzas/secretaria' },
      { name: 'Balances', icon: '⚖️', href: '/empresa/finanzas/balances' },
    ],
    'Infraestructura': [
      { name: 'Organigrama', icon: '🏢', href: '/empresa/infraestructura/organigrama' },
      { name: 'Instalaciones', icon: '🏭', href: '/empresa/infraestructura/instalaciones' },
      { name: 'Inventarios', icon: '📋', href: '/empresa/infraestructura/inventarios' },
      { name: 'Activos', icon: '💼', href: '/empresa/infraestructura/activos' },
    ],
    'Legal': [
      { name: 'Permisos', icon: '🧾', href: '/empresa/legal/permisos' },
      { name: 'Lineamientos', icon: '📋', href: '/empresa/legal/lineamientos' },
      { name: 'SAT', icon: '🏛️', href: '/empresa/legal/sat' },
      { name: 'Aviso de registro REPSE', icon: '📤', href: '/empresa/legal/repse' },
    ],
    'Facturación': [
      { name: 'Altas/Bajas', icon: '👥', href: '/empresa/facturacion/altas-bajas' },
      { name: 'Carga/Descarga', icon: '📤', href: '/empresa/facturacion/carga' },
      { name: 'Base de Datos', icon: '🗄️', href: '/empresa/facturacion/base-datos' },
      { name: 'Refacturación', icon: '📋', href: '/empresa/facturacion/refacturacion' },
    ]
  }

  const clienteItems: Record<string, SubItem[]> = { //MENU CLIENTE
    'Contratos': [
      { name: 'Altas/Bajas', icon: '👥', href: '/cliente/contratos/altas-bajas' },
      { name: 'Carga/Descarga', icon: '📤', href: '/cliente/contratos/carga' },
      { name: 'Base de Datos', icon: '🗄️', href: '/cliente/contratos/base-datos' },
      { name: 'Cumplimiento', icon: '✅', href: '/cliente/contratos/cumplimiento' }
    ],
    'Expedientes': [
      { name: 'Acta Constitutiva', icon: '📜', href: '/cliente/expedientes/acta' },
      { name: 'Constancia de Situación Fiscal', icon: '🏛️', href: '/cliente/expedientes/fiscal' },
      { name: 'Servicios', icon: '🔧', href: '/cliente/expedientes/servicios' },
    ],
    'Contabilidad': [
      { name: 'Balances', icon: '⚖️', href: '/cliente/contabilidad/balances' },
      { name: 'Pagos', icon: '💳', href: '/cliente/contabilidad/pagos' },
      { name: 'Pendientes', icon: '⏳', href: '/cliente/contabilidad/pendientes' },
      { name: 'Impuestos', icon: '🏛️', href: '/cliente/contabilidad/impuestos' }
    ],
    'Facturas': [
      { name: 'Carga/Descarga', icon: '📤', href: '/cliente/facturas/carga' },
      { name: 'Administración', icon: '⚙️', href: '/cliente/facturas/admin' },
      { name: 'Pendientes', icon: '⏳', href: '/cliente/facturas/pendientes' },
      { name: 'Discrepancias', icon: '⚠️', href: '/cliente/facturas/discrepancias' }
    ]
  }

  const proveedorItems: Record<string, SubItem[]> = { //MENU PROVEEDOR
    'Contratos': [
      { name: 'Altas/Bajas', icon: '👥', href: '/proveedor/contratos/altas-bajas' },
      { name: 'Carga/Descarga', icon: '📤', href: '/proveedor/contratos/carga' },
      { name: 'Base de Datos', icon: '🗄️', href: '/proveedor/contratos/base-datos' },
      { name: 'Cumplimiento', icon: '✅', href: '/proveedor/contratos/cumplimiento' }
    ],
    'Expedientes': [
      { name: 'Acta Constitutiva', icon: '📜', href: '/proveedor/expedientes/acta' },
      { name: 'Constancia de Situación Fiscal', icon: '🏛️', href: '/proveedor/expedientes/fiscal' },
      { name: 'Servicios', icon: '🔧', href: '/proveedor/expedientes/servicios' },
    ],
    'Contabilidad': [
      { name: 'Balances', icon: '⚖️', href: '/proveedor/contabilidad/balances' },
      { name: 'Pagos', icon: '💳', href: '/proveedor/contabilidad/pagos' },
      { name: 'Pendientes', icon: '⏳', href: '/proveedor/contabilidad/pendientes' },
      { name: 'Impuestos', icon: '🏛️', href: '/proveedor/contabilidad/impuestos' }
    ],
    'Facturas': [
      { name: 'Carga/Descarga', icon: '📤', href: '/proveedor/facturas/carga' },
      { name: 'Administración', icon: '⚙️', href: '/proveedor/facturas/admin' },
      { name: 'Pendientes', icon: '⏳', href: '/proveedor/facturas/pendientes' },
      { name: 'Discrepancias', icon: '⚠️', href: '/proveedor/facturas/discrepancias' }
    ]
  }

  const auditoriaItems: Record<string, SubItem[]> = { //MENU AUDITORIA
    'Monitoreo': [
      { name: 'Rendimiento', icon: '📊', href: '/auditoria/monitoreo/rendimiento' },
      { name: 'Procesos', icon: '📤', href: '/auditoria/monitoreo/procesos' },
      { name: 'Alertas', icon: '⚠️', href: '/auditoria/monitoreo/alertas' },
      { name: 'Reportes', icon: '🎯', href: '/auditoria/monitoreo/reportes' },
    ],
    'Accesos': [
      { name: 'Conexiones', icon: '⚙️', href: '/auditoria/accesos/conexiones' },
      { name: 'Consultas', icon: '📋', href: '/auditoria/accesos/consultas' },
      { name: 'Bajas', icon: '👥', href: '/auditoria/accesos/bajas' },
      { name: 'Restricciones', icon: '⚠️', href: '/auditoria/accesos/restricciones' },
    ],
    'Base de Datos': [
      { name: 'Base de Datos', icon: '🗄️', href: '/auditoria/base-datos/database' },
      { name: 'Administración', icon: '💼', href: '/auditoria/base-datos/admin' },
      { name: 'Reportar', icon: '⚠️', href: '/auditoria/base-datos/reportar' },
      { name: 'Capacidad', icon: '✅', href: '/auditoria/base-datos/capacidad' },
    ],
    'Discrepancias': [
      { name: 'Cargas', icon: '📤', href: '/auditoria/discrepancias/cargas' },
      { name: 'Estatus de los archivos', icon: '✅', href: '/auditoria/discrepancias/estatus' },
      { name: 'Modificaciones', icon: '📋', href: '/auditoria/discrepancias/modificaciones' },
      { name: 'Avisos', icon: '⚠️', href: '/auditoria/discrepancias/avisos' },
    ]
  }

  const itemsMap: Record<UserRole, Record<string, SubItem[]>> = {
    admin: adminItems,
    rh: rhItems,
    empresa: empresaItems,
    cliente: clienteItems,
    proveedor: proveedorItems,
    auditoria: auditoriaItems
  }

  return itemsMap[rol]?.[itemName] || []
}

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<UserData>({ nombre: '', rol: 'admin'  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    navigate('/login')
  }

  const navigation: NavItem[] = navByRole[user.rol] || []

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6">
            <div className="h-12 w-24 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs font-bold">LCK</span>
            </div>
            <nav className="hidden md:flex md:space-x-8">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                const subItems = getSubItems(item.name, user.rol)

                return subItems.length > 0 ? (
                  <div key={item.name} className="relative group">
                    <button className="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-black border-transparent hover:border-gray-300 hover:text-gray-700 focus:outline-none">
                      <item.icon className="mr-2 h-5 w-5 text-black" />
                      {item.name}
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
                      <div className="py-1">
                        {subItems.map((subItem, index) => (
                          <Link
                            key={index}
                            to={subItem.href || '#'}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700"
                          >
                            <span className="mr-2">{subItem.icon}</span>
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
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