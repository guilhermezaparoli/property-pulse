'use client'

import { Property } from "@/@types/PropertyTypes"
import PropertyCard from "@/components/PropertyCard"
import Spinner from "@/components/Spinner"
import { use, useEffect, useState } from "react"
import { toast } from "react-toastify"

const SavedPropertiesPage = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchSavedProperties = async () => {
            try {
                const res = await fetch('/api/bookmarks', {method: "GET"})

                if(res.status === 200){
                    const data = await res.json()
                    setProperties(data)
                } else {
                    console.log(res.statusText)
                    toast.error('Houve um erro ao buscar propriedades salvas')
                }
            } catch (error) {
                console.error(error)
                toast.error('Houve um erro ao buscar propriedades salvas')
            } finally {
                setLoading(false)
            }
        }
        fetchSavedProperties()
    }, [])
  return loading ? <Spinner loading={loading}/> : (
    <section className="px-4 py-6">
        <h1 className="text-2xl mb-4">Propriedades favoritas</h1>
    <div className="container-xl lg:container m-auto mt-6">
      {properties.length === 0 ? (
        <p>Nenhuma propriedade foi salva como favorita</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property: Property) => (
            <PropertyCard key={property._id} property={property}/>
          ))}
        </div>
      )}
    </div>
  </section>
  )
}

export default SavedPropertiesPage
