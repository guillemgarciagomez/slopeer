import { useState, useEffect } from 'preact/hooks'
import { route } from 'preact-router'
import { useMutation } from '@urql/preact'
import { h, FunctionComponent } from 'preact'
import { useAuth } from '../../context/AuthContext'
import { mutations } from '../../services/graphqlService'
import { RouteForm } from '../../components/'

type CoordType = {
  coords: {
    latitude: number;
    longitude: number;
  }
}

export type RouteDataType = {
  name: string;
  public: boolean;
  type: string;
  grade: string;
  description: string;
  lat: string;
  lng: string;
  author: any;
}

const getPosition = () =>
  new Promise<CoordType>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true })
  })

const parseCoords = (lat: number, lng: number) => ({
  lat: lat.toFixed(4),
  lng: lng.toFixed(4)
})

const AddRoute: FunctionComponent = () => {
  const initialData = {
    name: '',
    public: true,
    type: 'sport',
    grade: '1',
    description: '',
    lat: '',
    lng: '',
    author: useAuth().user
  }
  const [{ fetching: creatingRoute }, createRoute] = useMutation(mutations.createRoute)
  const [routeData, setRouteData] = useState<RouteDataType>(initialData)
  const [coords, setCoords] = useState('current')

  const updateLoc = async (e: Event) => {
    if (e) e.preventDefault()
    await setCurrentLoc();
  }

  const setCurrentLoc = async () => {
    if (typeof window !== 'undefined' && 'navigator' in window) {
      const { coords: { latitude, longitude } } = await getPosition()
      setRouteData(prevData => ({
        ...prevData,
        ...parseCoords(latitude, longitude)
      }))
    }
    setCoords('current');
  }

  const setMapLoc = (e: Event) => {
    e.preventDefault()
    let mapLoc
    if (typeof window !== 'undefined') {
      localStorage.getItem('mapLocation')
    }
    if (mapLoc) {
      const { lat, lng } = JSON.parse(mapLoc)
      setRouteData(prevData => ({
        ...prevData,
        ...parseCoords(lat, lng)
      }))
      setCoords('map')
    }
  }

  useEffect(() => {
    (async () => {
      await setCurrentLoc()
    })()
  }, [])

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (routeData.name) {
      const variables = { ...routeData }
      await createRoute(variables)
      route(`route/${response.data.createRoute._id}`)
    }
  }

  return <RouteForm
    title={'ADD A NEW ROUTE'}
    showSpinner={creatingRoute}
    routeData={routeData}
    setRouteData={setRouteData}
    onSubmit={handleSubmit}
    hasCoords={true}
    coords={coords}
    updateLoc={updateLoc}
    setMapLoc={setMapLoc}
  />
}

export default AddRoute
