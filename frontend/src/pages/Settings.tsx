import { useState } from 'react'
import { Settings as SettingsIcon, Save, Bell, Lock, Globe } from 'lucide-react'

type SettingSection = {
  id: string
  title: string
  description: string
  icon: typeof SettingsIcon
}

const sections: SettingSection[] = [
  {
    id: 'general',
    title: 'Configuración General',
    description: 'Configuración básica del sistema',
    icon: SettingsIcon
  },
  {
    id: 'notifications',
    title: 'Notificaciones',
    description: 'Preferencias de notificaciones',
    icon: Bell
  },
  {
    id: 'security',
    title: 'Seguridad',
    description: 'Configuración de seguridad y privacidad',
    icon: Lock
  },
  {
    id: 'language',
    title: 'Idioma y Región',
    description: 'Preferencias de idioma y zona horaria',
    icon: Globe
  }
]

export default function Settings() {
  const [activeSection, setActiveSection] = useState('general')

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Configuración</h1>
          <p className="mt-2 text-sm text-gray-700">
            Configura las preferencias del sistema
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`${
                    activeSection === section.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
                >
                  <section.icon
                    className={`${
                      activeSection === section.id
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  />
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                {activeSection === 'general' && (
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Configuración General
                    </h3>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                          Nombre de la Empresa
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="company-name"
                            id="company-name"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            defaultValue="LCK Consultores"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                          Zona Horaria
                        </label>
                        <div className="mt-1">
                          <select
                            id="timezone"
                            name="timezone"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option>America/Mexico_City</option>
                            <option>America/New_York</option>
                            <option>Europe/London</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'notifications' && (
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Notificaciones
                    </h3>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="email-notifications"
                            name="email-notifications"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-notifications" className="font-medium text-gray-700">
                            Notificaciones por Email
                          </label>
                          <p className="text-gray-500">
                            Recibe notificaciones por correo electrónico
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="push-notifications"
                            name="push-notifications"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="push-notifications" className="font-medium text-gray-700">
                            Notificaciones Push
                          </label>
                          <p className="text-gray-500">
                            Recibe notificaciones en tiempo real
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'security' && (
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Seguridad
                    </h3>
                    <div className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                          Contraseña Actual
                        </label>
                        <div className="mt-1">
                          <input
                            type="password"
                            name="current-password"
                            id="current-password"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                          Nueva Contraseña
                        </label>
                        <div className="mt-1">
                          <input
                            type="password"
                            name="new-password"
                            id="new-password"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'language' && (
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Idioma y Región
                    </h3>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                          Idioma
                        </label>
                        <div className="mt-1">
                          <select
                            id="language"
                            name="language"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option>Español</option>
                            <option>English</option>
                            <option>Français</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="date-format" className="block text-sm font-medium text-gray-700">
                          Formato de Fecha
                        </label>
                        <div className="mt-1">
                          <select
                            id="date-format"
                            name="date-format"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option>DD/MM/YYYY</option>
                            <option>MM/DD/YYYY</option>
                            <option>YYYY-MM-DD</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 