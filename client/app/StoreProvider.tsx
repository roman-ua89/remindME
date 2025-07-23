'use client'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'
import { setupStore, AppStore } from '@/store/store'

export default function StoreProvider({
  children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(undefined)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = setupStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
