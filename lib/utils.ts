import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function shadeFromHex(hexCode: string): "white" | "black" {
	// convert hexcolor to rgb
	const r = parseInt(hexCode.slice(1, 3), 16);
	const g = parseInt(hexCode.slice(3, 5), 16);
	const b = parseInt(hexCode.slice(5, 7), 16);

	console.log(`r: ${r}, g: ${g}, b: ${b} for ${hexCode}`);
	// if one of them is greater than 128, return black if not white
	return r > 125 || g > 125 || b > 125 ? "black" : "white";
}
