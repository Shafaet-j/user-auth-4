import { Review } from "../reviewModel/review.model";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

export type Query = {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  startDate?: string;
  endDate?: string;
  language?: string;
  provider?: string;
  durationInWeeks?: number;
  level?: string;
};

const createCourseIntoDb = async (courseData: TCourse) => {
  const course = new Course(courseData);
  const result = await course.save();
  return result;
};

const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const {
    page = 1,
    limit = 5,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = query;
  const searchTerm: any = {};
  if (tags) {
    searchTerm["tags.name"] = tags;
  }
  if (minPrice && maxPrice) {
    searchTerm.price = { $gte: minPrice, $lte: maxPrice };
  }
  if (startDate && endDate) {
    searchTerm.startDate = { $gte: startDate, $lte: endDate };
  }
  if (language) {
    searchTerm.language = language;
  }
  if (provider) {
    searchTerm.provider = provider;
  }
  if (durationInWeeks) {
    searchTerm.durationInWeeks = durationInWeeks;
  }
  if (level) {
    searchTerm["details.level"] = level;
  }
  let sort: any = {};
  if (sortBy) {
    sort = { [sortBy as string]: 1 };
  }
  if (sortOrder === "asc" || sortOrder === "desc") {
    sort = sortOrder === "asc" ? { createdAt: 1 } : { createdAt: -1 };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const courses = await Course.find(searchTerm)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit))
    .exec();

  const total = await Course.countDocuments(searchTerm);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: courses,
  };
};

const getSingleCourseWithReviewFromDb = async (courseId: string) => {
  const course = await Course.findById(courseId);

  return course;
};
const updateCourseFromDb = async (
  courseId: string,
  payload: Partial<TCourse>
) => {
  const { tags, details, ...remainingData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (tags && Object.keys(tags).length) {
    for (const [key, value] of Object.entries(tags)) {
      modifiedData[`tags.${key}`] = value;
    }
  }
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value;
    }
  }

  return await Course.findByIdAndUpdate(courseId, modifiedData, {
    new: true,
    runValidators: true,
  });
};
const getBestCourseFromDb = async () => {};

export const CourseService = {
  createCourseIntoDb,
  getAllCourseFromDb,
  getSingleCourseWithReviewFromDb,
  updateCourseFromDb,
  getBestCourseFromDb,
};
