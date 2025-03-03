export const asyncHandler = (fn: (...args: any[]) => Promise<any>) => {
  return async (req: any, res: any, next: any) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error("❌ Async Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
};
