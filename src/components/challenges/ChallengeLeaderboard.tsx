"use client";

import { motion } from "framer-motion";
import { Trophy, Award, TrendingUp, User, ExternalLink, Star, Clock, CheckCircle } from "lucide-react";
import { Submission } from "@/types";
import { formatDate } from "@/lib/utils";

interface ChallengeLeaderboardProps {
  submissions: (Submission & {
    user: {
      id: string;
      full_name: string;
      avatar_url: string | null;
      rank: string;
    };
  })[];
  challengeId: string;
}

export default function ChallengeLeaderboard({ submissions, challengeId }: ChallengeLeaderboardProps) {
  // Sort submissions by score (highest first), then by submission date (earliest first)
  const sortedSubmissions = [...submissions].sort((a, b) => {
    if (a.score === null && b.score === null) return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    if (b.score !== a.score) return b.score - a.score;
    return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
  });

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "from-yellow-500 to-amber-600";
      case 2: return "from-gray-400 to-gray-600";
      case 3: return "from-amber-700 to-amber-900";
      default: return "from-bg-secondary to-bg-tertiary";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5" />;
      case 2: return <Award className="w-5 h-5" />;
      case 3: return <Award className="w-5 h-5" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Graded
          </span>
        );
      case "submitted":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-900/30 text-gray-400 border border-gray-800">
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Challenge Leaderboard
          </h2>
          <p className="text-text-secondary mt-1">
            Top performers for this challenge. Scores are based on code quality, creativity, and completeness.
          </p>
        </div>
        <div className="text-sm text-text-secondary">
          {submissions.length} total submission{submissions.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Podium for top 3 */}
      {sortedSubmissions.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[2, 1, 3].map((podiumRank) => {
            const submission = sortedSubmissions[podiumRank - 1];
            if (!submission) return null;
            
            return (
              <motion.div
                key={submission.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: podiumRank * 0.1 }}
                className={`relative rounded-xl p-6 border ${
                  podiumRank === 1 
                    ? "md:order-2 bg-gradient-to-br from-yellow-900/20 to-yellow-950/10 border-yellow-800/50 shadow-lg shadow-yellow-900/10" 
                    : "bg-gradient-to-br from-gray-900/10 to-gray-950/5 border-border"
                }`}
              >
                <div className="absolute top-4 right-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    podiumRank === 1 ? "bg-yellow-900/30 text-yellow-400" :
                    podiumRank === 2 ? "bg-gray-800/30 text-gray-400" :
                    "bg-amber-900/30 text-amber-400"
                  }`}>
                    {getRankIcon(podiumRank)}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    #{podiumRank}
                  </div>
                  <div className="w-16 h-16 rounded-full bg-bg-tertiary border-2 border-border mx-auto mb-3 flex items-center justify-center overflow-hidden">
                    {submission.user.avatar_url ? (
                      <img 
                        src={submission.user.avatar_url} 
                        alt={submission.user.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-text-secondary" />
                    )}
                  </div>
                  <h3 className="font-semibold">{submission.user.full_name}</h3>
                  <div className="text-sm text-text-secondary mb-2">{submission.user.rank}</div>
                  
                  <div className="mt-4">
                    <div className="text-2xl font-bold">
                      {submission.score !== null ? `${submission.score}/100` : "—"}
                    </div>
                    <div className="text-xs text-text-secondary">Score</div>
                  </div>
                  
                  {submission.github_url && (
                    <a
                      href={submission.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-secondary hover:text-primary mt-3"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Code
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Full leaderboard table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-secondary border-b border-border">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">Rank</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">Participant</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">Score</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">Submitted</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedSubmissions.map((submission, index) => (
                <motion.tr
                  key={submission.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-bg-secondary/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? "bg-yellow-900/20 text-yellow-500" :
                        index === 1 ? "bg-gray-800/20 text-gray-400" :
                        index === 2 ? "bg-amber-900/20 text-amber-400" :
                        "bg-bg-tertiary text-text-secondary"
                      }`}>
                        {index + 1}
                      </div>
                      {index < 3 && (
                        <div className="text-text-secondary">
                          {getRankIcon(index + 1)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-bg-tertiary border border-border flex items-center justify-center overflow-hidden">
                        {submission.user.avatar_url ? (
                          <img 
                            src={submission.user.avatar_url} 
                            alt={submission.user.full_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5 text-text-secondary" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{submission.user.full_name}</div>
                        <div className="text-sm text-text-secondary">{submission.user.rank}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {submission.score !== null ? (
                        <>
                          <div className="text-2xl font-bold">{submission.score}</div>
                          <div className="text-sm text-text-secondary">/100</div>
                        </>
                      ) : (
                        <div className="text-text-secondary">—</div>
                      )}
                    </div>
                    {submission.score !== null && (
                      <div className="w-24 h-1.5 bg-bg-tertiary rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
                          style={{ width: `${submission.score}%` }}
                        />
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(submission.status)}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-secondary">
                    {formatDate(submission.submitted_at)}
                    {submission.graded_at && (
                      <div className="text-xs">
                        Graded: {formatDate(submission.graded_at)}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {submission.github_url && (
                        <a
                          href={submission.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-secondary hover:text-primary"
                        >
                          <ExternalLink className="w-3 h-3" />
                          GitHub
                        </a>
                      )}
                      {submission.live_url && (
                        <a
                          href={submission.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Live
                        </a>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedSubmissions.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-bg-tertiary border border-border flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-text-secondary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No submissions yet</h3>
            <p className="text-text-secondary max-w-md mx-auto">
              Be the first to submit a solution and claim the top spot on the leaderboard!
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-900/30 border border-yellow-800"></div>
          <span>1st Place</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-800/30 border border-gray-700"></div>
          <span>2nd Place</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-900/30 border border-amber-800"></div>
          <span>3rd Place</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>Graded</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-blue-500" />
          <span>Pending Review</span>
        </div>
      </div>
    </div>
  );
}