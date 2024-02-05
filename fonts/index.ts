import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});

export { inter, poppins };
