
import LoginButton from "@/components/shared/LoginButton"
import TokensList from "./_components/TokensList"
import ActivityList from "./_components/ActivityList"

export default function Home() {
    return (
        <main className="flex flex-col gap-4 flex-1 relative h-full w-full items-center justify-start">
            <TokensList />
            <div className="w-full bg-secondary h-[1px]" />
            <ActivityList />
        </main>
    )
}
