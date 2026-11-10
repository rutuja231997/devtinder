import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Users, AlertCircle, X } from "lucide-react";

import axiosInstance from "../utils/axiosInstance";
import DeveloperCard from "../components/DeveloperCard";
import SearchPagination from "../components/Search/SearchPagination";

import {
  setSearchUsers,
  setSearchPagination,
  removeSearchUser,
  clearSearchResults,
} from "../utils/searchUserSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read search results from Redux
  const { users, pagination } = useSelector((store) => store.searchUser);

  // Read query and page number from URL
  const query = searchParams.get("q") || "";
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [requestError, setRequestError] = useState("");

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      setRequestError("");

      const response = await axiosInstance.post(
        `/request/send/${status}/${userId}`,
        {},
      );

      console.log(response.data);
      dispatch(removeSearchUser(userId));
    } catch (err) {
      console.log(err);

      setRequestError(
        err.response?.data?.message ||
          "Unable to process your request. Please try again.",
      );
    }
  };

  // Fetch developers whenever query or page changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        dispatch(clearSearchResults());
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axiosInstance.get("/user/search", {
          params: {
            query: query.trim(),
            page: currentPage,
            limit: 10,
          },
        });

        dispatch(setSearchUsers(response.data.users || []));

        dispatch(
          setSearchPagination({
            totalUsers: response.data.pagination?.totalUsers || 0,
            totalPages: response.data.pagination?.totalPages || 0,
          }),
        );
      } catch (err) {
        console.error("Search API error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load developers. Please try again.",
        );

        dispatch(clearSearchResults());
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage, dispatch]);

  // Handle pagination
  const handlePageChange = (page) => {
    setSearchParams({
      q: query,
      page: String(page),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen w-full px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-brand">
              <Search className="size-5" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                Search developers
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Discover developers and connect with the community.
              </p>
            </div>
          </div>

          {/* Search Information */}
          {query && (
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Search results for
                </p>

                <h2 className="mt-1 text-lg font-semibold text-heading">
                  "{query}"
                </h2>
              </div>

              {!loading && !error && (
                <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">
                  <Users className="size-3.5" />
                  {pagination.totalUsers} developers found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Empty Query State */}
        {!query.trim() && (
          <div className="rounded-3xl border border-border bg-surface px-6 py-16 text-center">
            <Search className="mx-auto size-10 text-muted-foreground" />

            <h2 className="mt-4 text-lg font-semibold text-heading">
              Find your developer community
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Search by developer name, skills or areas of expertise.
            </p>
          </div>
        )}

        {/* Loading State */}
        {query && loading && (
          <div className="flex flex-col items-center py-20">
            <div className="size-8 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />

            <p className="mt-4 text-sm text-muted-foreground">
              Finding developers...
            </p>
          </div>
        )}

        {/* Error State */}
        {query && !loading && error && (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 px-6 py-12 text-center">
            <AlertCircle className="mx-auto size-9 text-red-400" />

            <h2 className="mt-4 font-semibold text-heading">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </div>
        )}

        {/* No Results State */}
        {query && !loading && !error && users.length === 0 && (
          <div className="rounded-3xl border border-border bg-surface px-6 py-16 text-center">
            <Users className="mx-auto size-10 text-muted-foreground" />

            <h2 className="mt-5 text-lg font-semibold text-heading">
              No developers found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              We couldn't find developers matching "{query}". Try another name
              or skill.
            </p>
          </div>
        )}

        {/* Search Results */}
        {query && !loading && !error && users.length > 0 && (
          <>
            {/* Request Error */}
            {requestError && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3"
              >
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-400" />

                <div className="flex-1">
                  <p className="text-sm font-medium text-red-400">
                    Request failed
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {requestError}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setRequestError("")}
                  className="text-sm text-muted-foreground transition hover:text-heading"
                  aria-label="Dismiss error"
                >
                  <X className="size-4" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-3 gap-5">
              {users.map((user) => (
                <DeveloperCard
                  key={user._id}
                  user={user}
                  showActions={true}
                  handleSendRequest={handleSendRequest}
                />
              ))}
            </div>

            {/* Pagination */}
            <SearchPagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </main>
  );
}
