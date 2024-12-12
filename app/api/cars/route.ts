import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://ast.prd.karvi.com.ar/challenge/cars/ASST-challenge-01JEVJTR90HVPSS2NRPPG02CJ3.json"
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch cars" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data.items); 
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      { message: "Error fetching cars", error: errorMessage },
      { status: 500 }
    );
  }
}